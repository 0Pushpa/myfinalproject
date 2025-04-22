import { Helmet } from "react-helmet-async";

const Page = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default Page;
