import React from "react";

function page({ params }) {
  return (
    <div>
      <h1>Detail page for Game: {params.gameId}</h1>
    </div>
  );
}

export default page;
