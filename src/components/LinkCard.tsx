import React from 'react';

interface LinkCardProps {
  name: string;
  url: string;
  openInNewTab: boolean; // Determines whether the link opens in a new tab
}

const LinkCard: React.FC<LinkCardProps> = ({ name, url, openInNewTab }) => {
  // Function to handle opening the link
  const handleClick = () => {
    if (openInNewTab) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center mb-4 hover:shadow-xl transition-shadow">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">{url}</p>
      </div>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Open Link
      </button>
    </div>
  );
};

export default LinkCard;
