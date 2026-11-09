import React from "react";
import { Composition } from "remotion";
import { MelazaShort } from "./videos/melaza/Melaza";
import { TOTAL, FPS } from "./videos/melaza/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Melaza" component={MelazaShort} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
