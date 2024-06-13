import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const NewsDetailPage = ({ params: { id } }: Props) => {
  return <div>NewsDetailPage, ID:{id}</div>;
};

export default NewsDetailPage;
