// consts
var SHEET_NAME = ""
var STORE_QUESTION_COLUMN_COUNT = 40
var WAIT_TYPE_COLUMN_COUNT = 2
var WAIT_TYPE_QUESTION_COLUMN_COUNT = 40
var STORE_GROUP_CD = "KeyANY"
var WAIT_TYPE_GROUP_CD = "KeyWAIT_TYPE"
var DISP_FLG = "TRUE"
var MAX_ROW_COUNT = 183 // 件数(タイトルを含まない行数)

// sheets
var spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
var sheet = spreadSheet.getSheetByName(SHEET_NAME)
var questionOutputSheet = spreadSheet.getSheetByName("question")

function main() {
    clearOutputSheet(questionOutputSheet)
    waitType()
    store()
}

function waitType() {
    var currentWaitTypeId = ""
    var currentQuestionId = -1
    var currentQuestionWord = ""
    var currentChoiceId = 0
    var currentChoiceName = ""
    var nextQuestionId = ""
    var dispNo = 0

    var qIdList = []
    for (i = 0; i < 20; i++) {
        qIdList.push(-1)
    }
    var qDispNoList = []
    for (i = 0; i < 20; i++) {
        qDispNoList.push(-1)
    }

    for (var i = 2; i < MAX_ROW_COUNT; i++) {
        var range = sheet.getRange(i, STORE_QUESTION_COLUMN_COUNT + 1, 1, WAIT_TYPE_COLUMN_COUNT + WAIT_TYPE_QUESTION_COLUMN_COUNT)
        var rowValues = range.getValues()[0]
        var waitTypeId = rowValues[0]
        if (waitTypeId != "") {
            currentWaitTypeId = waitTypeId
            var questionName1 = rowValues[2]
            if (questionName1 != "") {
                currentQuestionId += 1
                qIdList[0] = currentQuestionId
                qDispNoList[0] += 1
                waitTypeQuestion(waitTypeId, qIdList[0], questionName1, qDispNoList[0], "")
                var choiceName1 = rowValues[3]
                if (choiceName1 != "") {
                    currentChoiceId += 1
                    var choiceId1 = currentChoiceId
                    waitTypeChoice(qIdList[0], choiceId1, choiceName1, waitTypeId, dispNo, "")
                    var questionName2 = rowValues[4]
                    if (questionName2 != "") {
                        currentQuestionId += 1
                        qIdList[1] = currentQuestionId
                        qDispNoList[1] += 1
                        waitTypeQuestion(waitTypeId, qIdList[1], questionName2, qDispNoList[1], "")
                        var choiceName2 = rowValues[5]
                        if (choiceName2 != "") {
                            currentChoiceId += 1
                            var choiceId2 = currentChoiceId
                            waitTypeChoice(qIdList[1], choiceId2, choiceName2, waitTypeId, dispNo, "")
                        } else {
                            continue
                        }
                    }
                }
            }
        }
    }
}

function waitTypeQuestion(waitTypeId, questionId, questionName, dispNo, nextQuestionId) {
  var questionRow = [WAIT_TYPE_GROUP_CD, questionId, questionName, waitTypeId, DISP_FLG, dispNo, nextQuestionId]
  output(questionRow)
}

function waitTypeChoice(questionId, choiceId, choiceName, waitTypeId, dispNo, nextQuestionId) {
  Logger.log(WAIT_TYPE_GROUP_CD + "," + questionId + "," + choiceId + "," + choiceName + "," + waitTypeId + "," + dispNo + "," + nextQuestionId)
}

function clearOutputSheet(sheet) {
    sheet.clearContents()
}

function output(questionRow) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("question")
    var lastRow = getLastRow(sheet)
    var row = lastRow + 1
    var column = questionRow.length
    sheet.getRange(row, 1, 1, column).setValues([questionRow])
}

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
