"use client";

import { useEffect } from "react";
import { socketClient } from "@/lib/socket/client";
import { useGameStore } from "./store";

export const useMatchmakingSocket = () => {
  const handleUpdate = useGameStore((state) => state.handleUpdate);
  const setMatched = useGameStore((state) => state.setMatched);
  const handleDiff = useGameStore((state) => state.handleDiff);

  useEffect(() => {
    const socket = socketClient();

    socket.on("queue.update", handleUpdate);
    socket.on("queue.matchFound", setMatched);
    socket.on("game:diff", ({ gameId, diff }) => handleDiff(diff, gameId));

    return () => {
      socket.off("queue.update", handleUpdate);
      socket.off("queue.matchFound", setMatched);
      socket.off("game:diff");
    };
  }, [handleUpdate, setMatched, handleDiff]);
};

