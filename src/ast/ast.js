const { VariantInfo, createType } = require("../lib/types/types");
const { Record } = require("../lib/types/record");

const variantInfos = [VariantInfo("Program", [], {})];

exports.Ast = createType("Ast", variantInfos);
