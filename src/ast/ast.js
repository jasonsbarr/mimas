const { VariantInfo, createType } = require("../types/types");
const { Record } = require("../types/record");

const variantInfos = [VariantInfo("Program", [], {})];

exports.Ast = createType("Ast", variantInfos);
