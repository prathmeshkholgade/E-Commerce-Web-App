import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <p>some error occurred</p>
      <h1>{error.statusText || 404}</h1>
      <h1>{error.status || "unexpetederror occured"}</h1>
    </div>
  );
}
