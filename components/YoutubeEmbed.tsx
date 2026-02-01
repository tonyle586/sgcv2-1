import React from "react";

interface YoutubeEmbedProps {
  embedId: string;
  autoplay?: boolean;
  loop?: boolean;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ embedId, autoplay = false, loop = false }) => {
  // Build query parameters
  const params = new URLSearchParams();
  
  if (autoplay) {
    params.append('autoplay', '1');
    params.append('mute', '1'); // Autoplay requires mute in most browsers
  }
  
  if (loop) {
    params.append('loop', '1');
    params.append('playlist', embedId); // Loop requires playlist param to be set to the video ID
  }

  // Ensure rel=0 is always set to minimize external suggested videos
  params.append('rel', '0');

  const src = `https://www.youtube.com/embed/${embedId}?${params.toString()}`;

  return (
    <div className="relative overflow-hidden pb-[56.25%] h-0 rounded-2xl shadow-xl mb-12 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
      <iframe
        width="853"
        height="480"
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded Video"
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default YoutubeEmbed;