"use client";
import { DiscussionEmbed } from 'disqus-react';

const DisqusComments = ({ id, title, url }: { id: string; title: string; url: string }) => {
  const disqusShortname = "muslimshub"; // e.g., 'my-islamic-blog'
  const disqusConfig = {
    url: url,
    identifier: id,
    title: title,
  };

  return (
    <div className="mt-10 p-6">
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;
