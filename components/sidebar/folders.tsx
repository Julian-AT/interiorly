"use client";

import { Folder } from "@/lib/supabase/supabase.types";
import React, { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { v4 } from "uuid";
import { createFolder } from "@/lib/supabase/queries";
import { Accordion } from "@/components/ui/accordion";
import useSupabaseRealtime from "@/lib/hooks/use-supabase-realtime";
import { useSubscriptionModal } from "@/lib/provider/subscription-modal-provider";
import { useSupabaseUser } from "@/lib/provider/supabase-user-provider";
import { useAppState } from "@/lib/provider/state-provider";
import { toast } from "sonner";
import TooltipComponent from "@/components/tooltip-component";
import Dropdown from "@/components/sidebar/dropdown";

interface FoldersDropdownListProps {
  workspaceFolders: Folder[];
  workspaceId: string;
}

const FoldersDropdownList: React.FC<FoldersDropdownListProps> = ({
  workspaceFolders,
  workspaceId,
}) => {
  useSupabaseRealtime();
  const { state, dispatch, folderId } = useAppState();
  const { open, setOpen } = useSubscriptionModal();
  const [folders, setFolders] = useState(workspaceFolders);
  const { subscription } = useSupabaseUser();

  useEffect(() => {
    if (workspaceFolders.length > 0) {
      dispatch({
        type: "SET_FOLDERS",
        payload: {
          workspaceId,
          folders: workspaceFolders.map((folder) => ({
            ...folder,
            files:
              state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                //@ts-ignore
                ?.folders.find((f) => f.id === folder.id)?.files || [],
          })),
        },
      });
    }
  }, [workspaceFolders, workspaceId]);

  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders || []
    );
  }, [state]);

  const addFolderHandler = async () => {
    if (folders.length >= 3 && !subscription) {
      setOpen(true);
      return;
    }
    const newFolder: Folder = {
      data: null,
      id: v4(),
      createdAt: new Date().toISOString(),
      title: "Untitled",
      iconId: "📄",
      inTrash: null,
      workspaceId,
      bannerUrl: "",
    };
    dispatch({
      type: "ADD_FOLDER",
      payload: { workspaceId, folder: { ...newFolder, files: [] } },
    });
    const { data, error } = await createFolder(newFolder);
    if (error) {
      toast("Error", {
        description: "Could not create the folder",
      });
    } else {
      toast("Success", {
        description: "Created folder.",
      });
    }
  };

  return (
    <>
      <div className="flex w-full justify-between items-center group/title">
        <span className="font-bold text-sm">FOLDERS</span>
        <TooltipComponent message="Create Folder">
          <PlusIcon
            onClick={addFolderHandler}
            className="w-5 h-5 group-hover/title:flex hidden cursor-pointer text-secondary-foreground"
          />
        </TooltipComponent>
      </div>
      <Accordion type="multiple" defaultValue={[folderId || ""]}>
        {folders
          .filter((folder) => !folder.inTrash)
          .map((folder) => (
            <Dropdown
              key={folder.id}
              title={folder.title}
              listType="folder"
              id={folder.id}
              iconId={folder.iconId}
            />
          ))}
      </Accordion>
    </>
  );
};

export default FoldersDropdownList;
