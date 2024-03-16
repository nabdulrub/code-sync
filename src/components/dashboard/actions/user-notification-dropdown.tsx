"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetNotifications } from "@/data/useGetNotifications";
import { Bell } from "lucide-react";
import InvitationCard from "../invitation-card";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {};

const UserNotificationDropDown = (props: Props) => {
  const { data: notifications } = useGetNotifications();
  const [isNewNotification, setIsNewNotification] = useState(false);
  useEffect(() => {
    if (notifications) {
      setIsNewNotification(notifications?.length > 0);
    }
  }, [notifications]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={() => setIsNewNotification(false)}
        className="relative"
      >
        <Bell className={cn("w-8 h-8")} />

        {isNewNotification && (
          <>
            <span className="absolute w-3 h-3 bg-red-500 rounded-full top-0 right-1 animate-ping" />
            <span className="absolute w-3 h-3 bg-red-500 rounded-full top-0 right-1 " />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4 mr-4">
        {notifications?.length ? (
          notifications?.map((notification) => (
            <DropdownMenuItem key={notification.id} asChild>
              <InvitationCard invitiation={notification} />
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>No Invitiations</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNotificationDropDown;
