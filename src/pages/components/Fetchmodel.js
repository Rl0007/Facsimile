import React, { Suspense, useEffect, useState } from "react";
import Gltfpage from "../Gltfpage";

function Fetchmodel({ render_model_url }) {
  return (
    <>
      {render_model_url !== "" ? (
        <Suspense fallback={null}>
          <Gltfpage rendermodel={render_model_url} />
        </Suspense>
      ) : (
        ""
      )}
    </>
  );
}

export default Fetchmodel;
