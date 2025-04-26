import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/lib/users";
import { User } from "@prisma/client";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with the secret.
  const wh = new Webhook(SIGNING_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("Received event data:", evt.data);
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses } = evt.data;

    if (!id || !email_addresses) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    const newUserPayload = {
      id,
      email: email_addresses[0].email_address,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await createUser(newUserPayload as User);
  } else if (eventType === "user.updated") {
    const { id, email_addresses } = evt.data;
    if (!id) {
      return new Response("Error occurred -- missing id", {
        status: 400,
      });
    }

    const updatedUserPayload = {
      email: email_addresses ? email_addresses[0].email_address : undefined,
      updatedAt: new Date(),
    };
    await updateUser(id, updatedUserPayload);
  } else if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (!id) {
      return new Response("Error occurred -- missing id", {
        status: 400,
      });
    }
    await deleteUser(id);
  }

  return new Response("", { status: 200 });
}