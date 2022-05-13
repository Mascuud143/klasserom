module.exports.formatClassParams = function (id) {
  let classId = id;

  let words = classId.split("-").slice(0, -2).join(" ").trim(" ");
  let year = classId.split("-").slice(-2).join("-").trim(" ");

  return words + " " + year;
};
