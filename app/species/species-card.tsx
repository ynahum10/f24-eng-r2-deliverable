"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

/*
Note: "use client" is a Next.js App Router directive that tells React to render the component as
a client component rather than a server component. This establishes the server-client boundary,
providing access to client-side functionality such as hooks and event handlers to this component and
any of its imported children. Although the SpeciesCard component itself does not use any client-side
functionality, it is beneficial to move it to the client because it is rendered in a list with a unique
key prop in species/page.tsx. When multiple component instances are rendered from a list, React uses the unique key prop
on the client-side to correctly match component state and props should the order of the list ever change.
React server components don't track state between rerenders, so leaving the uniquely identified components (e.g. SpeciesCard)
can cause errors with matching props and state in child components if the list order changes.
*/

import type { Database } from "@/lib/schema";
import Image from "next/image";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard({ species }: { species: Species }) {
  // Control open/closed state of the dialog
  const [open, setOpen] = useState<boolean>(false);
  // boolean to determine whether user can edit species
  {
    /*
  const [isVisible, setVisibility] = useState<boolean>(false);
  async function useSessionId() {
    const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
    const sessionId = session.user.id;
    if(species.author == userId) {
      true;
  }
*/
  }

  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.scientific_name}</h3>
      <h4 className="text-lg font-light italic">{species.common_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      {/* Replace the button with the detailed view dialog. */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex">
            <Button className="mt-3 w-full">Learn More</Button>
            {/*add conditional below here if user created species*/}
            <Button
              data-show-if="{sessionID}:{species.common_name}"
              type="button"
              className="mt-3 w-full"
              variant="secondary"
            >
              Edit Species
            </Button>
          </div>

          {/*COMMENTED OUT
          <Button variant="secondary">
            <Icons.add className="mr-3 h-5 w-5" />
            Add Species
          </Button>
          */}
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Learn More</DialogTitle>
            <DialogDescription>
              Here is more information about the {species.common_name}({species.scientific_name})!
            </DialogDescription>
          </DialogHeader>
          <div>
            {/* add species info here*/}
            <h1>Scientific Name: {species.scientific_name}</h1>
            <p>Common Name: {species.common_name}</p>
            <p>Total Population: {species.total_population}</p>
            <p>Kingdom: {species.kingdom}</p>
            <p>Description: {species.description}</p>
          </div>
          <div className="flex">
            <DialogClose asChild>
              <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      {/*<Button className="mt-3 w-full">Learn More</Button>*/}
    </div>
  );
}
