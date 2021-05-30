export const sortDateNewest = (array)=> {
  return array.sort(function compare(a, b) {
    var dateA = new Date(a.webPublicationDate);
    var dateB = new Date(b.webPublicationDate);
    return dateB - dateA;
  });
}

export const sortDateOldest = (array)=> {
  return array.sort(function compare(a, b) {
    var dateA = new Date(a.webPublicationDate);
    var dateB = new Date(b.webPublicationDate);
    return dateA - dateB;
  });
}