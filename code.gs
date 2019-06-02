// consts
var SHEET_NAME = ""
var STORE_QUESTION_COLUMN_COUNT = 40
var WAIT_TYPE_COLUMN_COUNT = 2
var WAIT_TYPE_QUESTION_COLUMN_COUNT = 40
var STORE_GROUP_CD = "KeyANY"
var WAIT_TYPE_GROUP_CD = "KeyWAIT_TYPE"
var DISP_FLG = "TRUE"
var MAX_ROW_COUNT = 200 // 件数(タイトルを含まない行数)

// sheets
var spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
var sheet = spreadSheet.getSheetByName(SHEET_NAME)
var questionOutputSheet = spreadSheet.getSheetByName("question")
var choiceOutputSheet = spreadSheet.getSheetByName("choice")

function main() {
  clearOutputSheet()
  waitType()
  store()
}

function waitType() {
  var currentWaitTypeId = ""
  var currentQuestionId = -1
  var currentChoiceId = -1
  var nextQuestionId = ""

  // 質問階層分questionId管理リストを用意
  var qIdList = []
  for (i = 0; i < 20; i++) {
    qIdList.push(-1)
  }
  // 質問の表示順
  var qDispNo = -1

  // 選択肢の表示順
  var cDispNoList = []
  for (i = 0; i < 20; i++) {
    cDispNoList.push(-1)
  }

 // 行ごとにループ
 for (var i = 2; i < MAX_ROW_COUNT; i++) {
   var range = sheet.getRange(i, STORE_QUESTION_COLUMN_COUNT + 1, 1, WAIT_TYPE_COLUMN_COUNT + WAIT_TYPE_QUESTION_COLUMN_COUNT)
   // 行の値の配列
   var rowValues = range.getValues()[0]
   var waitTypeId = rowValues[0]
   // 待ち項目IDがあれば保持、dispNoをリセット
   if (waitTypeId != "") {
     currentWaitTypeId = waitTypeId
     qDispNo = -1
   }
   // 回答タイトル1
   var questionWord1 = rowValues[2]
   if (questionWord1 != "") {
     currentQuestionId += 1
     qIdList[0] = currentQuestionId
     qDispNo += 1
     cDispNoList[0] = -1
     waitTypeQuestion(currentWaitTypeId, qIdList[0], questionWord1, qDispNo, "")
   }
   Logger.log(currentQuestionId)
   var nextQuestionId1 = rowValues[4] != "" ? currentQuestionId+1 : ""
   // 回答1
   var choiceWord1 = rowValues[3]
   if (choiceWord1 != "") {
     currentChoiceId += 1
     var choiceId1 = currentChoiceId
     cDispNoList[0] += 1
     waitTypeChoice(qIdList[0], choiceId1, choiceWord1, currentWaitTypeId, cDispNoList[0], nextQuestionId1)
   }
   // 回答タイトル2
   var questionWord2 = rowValues[4]
   if (questionWord2 != "") {
     currentQuestionId += 1
     qIdList[1] = currentQuestionId
     qDispNo += 1
     cDispNoList[1] = -1
     waitTypeQuestion(currentWaitTypeId, qIdList[1], questionWord2, qDispNo, "")
   }
   // 回答2
   var choiceWord2 = rowValues[5]
   if (choiceWord2 != "") {
     currentChoiceId += 1
     var choiceId2 = currentChoiceId
     cDispNoList[1] += 1
     waitTypeChoice(qIdList[1], choiceId2, choiceWord2, currentWaitTypeId, cDispNoList[1], "")
   }
 }
}

// 待ち項目に紐づく質問
function waitTypeQuestion(waitTypeId, questionId, questionWord, dispNo, nextQuestionId) {
  var rowValues = [WAIT_TYPE_GROUP_CD, questionId, questionWord, waitTypeId, DISP_FLG, dispNo, nextQuestionId]
  output("question", rowValues)
}

// 待ち項目に紐づく回答
function waitTypeChoice(questionId, choiceId, choiceWord, waitTypeId, dispNo, nextQuestionId) {
  var rowValues = [WAIT_TYPE_GROUP_CD, questionId, choiceId, choiceWord, waitTypeId, dispNo, nextQuestionId]
  output("choice", rowValues)
}

// 結果シートの値をクリア
function clearOutputSheet() {
  questionOutputSheet.clearContents()
  var titleValues = ["groupCd", "questionId", "questionWord", "waitTypeId", "dispFlg", "dispNo", "nextQuestionId"]
  var column = titleValues.length
  questionOutputSheet.getRange(1, 1, 1, column).setValues([titleValues])

  choiceOutputSheet.clearContents()
  var titleValues = ["groupCd", "questionId", "choiceId", "choiceWord", "waitTypeId", "dispNo", "nextQuestionId"]
  var column = titleValues.length
  choiceOutputSheet.getRange(1, 1, 1, column).setValues([titleValues])
}

// 結果シートに書き出し
function output(sheetName, rowValues) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  var lastRow = getLastRow(sheet)
  var row = lastRow + 1
  var column = rowValues.length
  sheet.getRange(row, 1, 1, column).setValues([rowValues])
}

// シートの値がある最終行を取得
function getLastRow(sheet) {
  const columnVals = sheet.getRange('A:A').getValues()
  return columnVals.filter(String).length
}




function store(sheet) {

}

function storeQuestion() {

}

function storeChoice() {

}
