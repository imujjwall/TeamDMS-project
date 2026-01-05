import { useState } from 'react';

const Node = ({ node, index }) => {
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isChildrenOpen, setIsChildrenOpen] = useState(false);

  const toggleContent = () => {
    setIsContentOpen(!isContentOpen);
  };

  const toggleChildren = (e) => {
    e.stopPropagation();
    setIsChildrenOpen(!isChildrenOpen);
  };

  return (
    <div 
      className="node" 
      id={node.id}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="node-title">
        <span onClick={node.content ? toggleContent : undefined}>
          {node.title}
        </span>
        
        {node.children && node.children.length > 0 && (
          <button
            className="toggle"
            onClick={toggleChildren}
            aria-expanded={isChildrenOpen}
            aria-label={`Toggle ${node.title} section`}
          >
            {isChildrenOpen ? '-' : '+'}
          </button>
        )}
      </div>

      {node.content && (
        <div 
          className={`content ${isContentOpen ? '' : 'hidden'}`}
          dangerouslySetInnerHTML={{ __html: node.content }}
        />
      )}

      {node.children && node.children.length > 0 && (
        <div className={`children ${isChildrenOpen ? '' : 'hidden'}`}>
          {node.children.map((child, childIndex) => (
            <Node key={child.id} node={child} index={childIndex} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Node;
