const makeViewPlayerList = (localPlayer, remotePlayers) => {
  const viewLocalPlayer = { ...localPlayer, isLocalPlayer: true };
  const viewRemotePlayerSocketIds = Object.keys(remotePlayers);
  const viewRemotePlayers = viewRemotePlayerSocketIds.reduce(
    (accum, remotePlayerSocketId) => {
      const viewRemotePlayer = {
        ...viewRemotePlayers[remotePlayerSocketId],
        isLocalPlayer: false,
        socketId: remotePlayerSocketId,
      };
      return [viewRemotePlayer, ...accum];
    },
    [],
  );
  const viewPlayerList = [viewLocalPlayer, ...viewRemotePlayers];
  return viewPlayerList;
};

export default makeViewPlayerList;
