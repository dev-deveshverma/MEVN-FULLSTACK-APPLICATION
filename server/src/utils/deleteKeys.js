//!function to delete keys from an object. delete keys can be a single string or an array of strings

function deleteKeys(obj, keysToDelete) {
    const updatedObj = { ...obj };
  
    if (Array.isArray(keysToDelete)) {
      keysToDelete.forEach(key => delete updatedObj[key]);
    } else {
      delete updatedObj[keysToDelete];
    }
  
    return updatedObj;
  }
  
  module.exports= deleteKeys;