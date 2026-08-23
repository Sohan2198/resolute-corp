const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/pages/blog/Blog.js');
let content = fs.readFileSync(filePath, 'utf8');

// Find the start of components (categories definition)
const splitIndex = content.indexOf('const categories = [...new Set(blogPosts.map(post => post.category))];');

let dataPart = content.slice(0, splitIndex);
let componentPart = content.slice(splitIndex);

// Remove React and other component-specific imports from dataPart
dataPart = dataPart.replace(/import React.*?;\r?\n/, '');
dataPart = dataPart.replace(/import \{ useNavigate \}.*?;\r?\n/, '');
dataPart = dataPart.replace(/import \{ ChevronDown\}.*?;\r?\n/, '');
dataPart = dataPart.replace(/import \{ Helmet \}.*?;\r?\n/, '');
dataPart = dataPart.replace(/import portfolioBg.*?;\r?\n/, '');

// Fix the image paths in dataPart because they were relative to 'components/pages/blog'
// The new location is 'src/data/blogData.js'
// From components/pages/blog to assets/ was '../../../assets/'
// From data/ to assets/ is '../assets/'
dataPart = dataPart.replace(/\.\.\/\.\.\/\.\.\/assets\//g, '../assets/');

// Write blogData.js
fs.writeFileSync(path.join(__dirname, 'data/blogData.js'), dataPart);

// Now rewrite Blog.js
let newBlogJs = 'import React, { useState, useEffect } from \'react\';\n' +
'import { useNavigate } from \'react-router-dom\';\n' +
'import { ChevronDown } from \'lucide-react\';\n' +
'import { Helmet } from \'react-helmet\';\n' +
'import portfolioBg from \'../../../assets/images/Resolute-UI-Portfolio.jpg\';\n' +
'import { blogPosts as initialBlogPosts } from \'../../../data/blogData\';\n\n' +
componentPart;

fs.writeFileSync(filePath, newBlogJs);
console.log("Successfully extracted blog data");
