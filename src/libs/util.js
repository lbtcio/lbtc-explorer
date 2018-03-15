let util = {
    
};
util.title = function (title) {
    title = title ?'LBTC - ' + title  : 'LBTC';
    window.document.title = title;
};

export default util;