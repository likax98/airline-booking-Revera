import { Suspense } from "react";

import { destinations } from "@/data";
import { AirlineForm } from "@/components/home/AirlineForm";
import { Spinner } from "@/components/shared";

const Home = () => (
  <Suspense fallback={<Spinner />}>
    <AirlineForm {...{ destinations }} />
  </Suspense>
);

export default Home;
