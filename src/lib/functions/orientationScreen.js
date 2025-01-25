import * as ScreenOrientation from "expo-screen-orientation";
import { useCallback, useEffect } from "react";

const landscapeScreens = ["/live", "/recap"];

export const useScreenOrientation = (props) => {
  const { pathname } = props;

  const changeScreenOrientation = useCallback(async () => {
    console.log("Mudando orientação, caminho:", pathname);  // Adicione este log para debugar
    await ScreenOrientation.unlockAsync();
    if (landscapeScreens.some((name) => pathname.includes(name))) {
      console.log("Bloqueando orientação para paisagem");  // Adicionando log para verificar
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    } else {
      console.log("Bloqueando orientação para retrato");  // Log para retrato
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  }, [pathname]);

  useEffect(() => {
    changeScreenOrientation().catch((e) => console.error(e));
  }, [changeScreenOrientation]);
};
