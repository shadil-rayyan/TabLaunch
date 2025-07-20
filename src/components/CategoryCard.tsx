// components/CategoryCard.tsx
'use client';

import React from 'react';
import LinkCard from '@/components/LinkCard';

interface CategoryCardProps {
  categoryName: string;
  links: { name: string; url: string }[];
  openInNewTab: boolean;
  onLaunchLinks: (links: { name: string; url: string }[], openInNewTab: boolean) => void;
  onEditCategory: (categoryName: string) => void;
  onDeleteCategory: (categoryName: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryName,
  links,
  openInNewTab,
  onLaunchLinks,
  onEditCategory,
  onDeleteCategory,
}) => {
  const handleLaunchLinks = () => {
    onLaunchLinks(links, openInNewTab);
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-xl mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white mb-4 cursor-pointer" onClick={handleLaunchLinks}>
          {categoryName}
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={() => onEditCategory(categoryName)}
            className="bg-yellow-500 text-white p-2 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => onDeleteCategory(categoryName)}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {links.map((link, idx) => (
          <LinkCard key={idx} name={link.name} url={link.url} openInNewTab={openInNewTab} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
