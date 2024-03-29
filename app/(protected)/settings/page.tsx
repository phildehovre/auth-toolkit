import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <p>{JSON.stringify(session)}</p>
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
};

export default SettingsPage;
