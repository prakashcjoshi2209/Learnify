import { auth } from "../../../auth";
import Basic from "./Basic";

const Page = async () => {
  const session = await auth();

  return <Basic session={session} />;
};

export default Page;
