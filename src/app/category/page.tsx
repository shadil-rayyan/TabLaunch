// app/category/page.tsx
'use client';

import { useState, useEffect } from 'react';
import CategoryCard from '@/components/CategoryCard';

interface Link {
  name: string;
  url: string;
}

const CategoryPage = () => {
  const [categories, setCategories] = useState<{ [key: string]: Link[] }>({});
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [openInNewTab, setOpenInNewTab] = useState(true);

  useEffect(() => {
    // Load categories from localStorage
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    // Save categories to localStorage
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = () => {
    if (newCategoryName && !categories[newCategoryName]) {
      setCategories((prevCategories) => ({
        ...prevCategories,
        [newCategoryName]: [],
      }));
      setNewCategoryName('');
    }
  };

  const handleAddLink = (category: string) => {
    if (newLinkName && newLinkUrl) {
      const updatedCategories = { ...categories };
      updatedCategories[category].push({ name: newLinkName, url: newLinkUrl });
      setCategories(updatedCategories);
      setNewLinkName('');
      setNewLinkUrl('');
    }
  };

  const handleLaunchLinks = (links: Link[], openInNewTab: boolean) => {
    links.forEach((link) => {
      if (openInNewTab) {
        window.open(link.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = link.url;
      }
    });
  };

  const handleEditCategory = (oldCategoryName: string) => {
    const newCategoryName = prompt('Enter new category name', oldCategoryName);
    if (newCategoryName && newCategoryName !== oldCategoryName) {
      const updatedCategories = { ...categories };
      const links = updatedCategories[oldCategoryName];
      delete updatedCategories[oldCategoryName];
      updatedCategories[newCategoryName] = links;
      setCategories(updatedCategories);
    }
  };

  const handleDeleteCategory = (categoryName: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${categoryName}"?`)) {
      const updatedCategories = { ...categories };
      delete updatedCategories[categoryName];
      setCategories(updatedCategories);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-6">Categories</h1>

      {/* Category Input */}
      <div className="flex mb-6">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="p-2 rounded-md bg-gray-800 text-white"
          placeholder="New Category Name"
        />
        <button
          onClick={handleAddCategory}
          className="ml-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Add Category
        </button>
      </div>

      {/* Category and Link Management */}
      {Object.keys(categories).map((categoryName) => (
        <div key={categoryName} className="mb-8">
          <CategoryCard
            categoryName={categoryName}
            links={categories[categoryName]}
            openInNewTab={openInNewTab}
            onLaunchLinks={handleLaunchLinks}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
          {/* Add New Link */}
          <div className="flex mt-4">
            <input
              type="text"
              value={newLinkName}
              onChange={(e) => setNewLinkName(e.target.value)}
              className="p-2 rounded-md bg-gray-800 text-white"
              placeholder="Link Name"
            />
            <input
              type="text"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              className="ml-2 p-2 rounded-md bg-gray-800 text-white"
              placeholder="Link URL"
            />
            <button
              onClick={() => handleAddLink(categoryName)}
              className="ml-4 bg-green-500 text-white p-2 rounded-md"
            >
              Add Link
            </button>
          </div>
        </div>
      ))}

      {/* Toggle New Tab/Window Option */}
      <div className="mt-6 flex items-center">
        <input
          type="checkbox"
          checked={openInNewTab}
          onChange={() => setOpenInNewTab(!openInNewTab)}
          className="mr-2"
        />
        <span>Open Links in New Tab</span>
      </div>
    </div>
  );
};

export default CategoryPage;
