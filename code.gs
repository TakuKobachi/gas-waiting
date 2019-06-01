var STORE_QUESTION_COLUMN_COUNT = 40
var WAIT_TYPE_COLUMN_COUNT = 2
var WAIT_TYPE_QUESTION_COLUMN_COUNT = 40
var DISP_FLG = "TRUE"
var MAX_ROW_COUNT = 40
var test = 0

function main() {
    waitType()
    storeQuestion()
}

function waitType() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('実例サンプル（HIS新宿本社）')
    var GROUP_CD = "KeyWAIT_TYPE"
    var dispNo = 0
    var currentWaitTypeId = ""
    var currentQuestionId = 0
    var currentQuestionWord = ""
    var currentChoiceId = 0
    var currentChoiceName = ""
    var nextQuestionId = ""
    var dispNo = 0
    for (var i = 2; i < MAX_ROW_COUNT; i++) {
        var range = sheet.getRange(i, STORE_QUESTION_COLUMN_COUNT + 1, 1, WAIT_TYPE_COLUMN_COUNT + WAIT_TYPE_QUESTION_COLUMN_COUNT)
        var rowValues = range.getValues()[0]
        Logger.log(rowValues)
        var waitTypeId = rowValues[0]
        if (waitTypeId != "") {
            currentWaitTypeId = waitTypeId
            var questionName1 = rowValues[2]
            if (questionName1 != "") {
                currentQuestionId += 1
                var questionId1 = currentQuestionId
                waitTypeQuestion(waitTypeId, questionId1, questionName1, dispNo, "")
                var choiceName1 = rowValues[3]
                if (choiceName1 != "") {
                    currentChoiceId += 1
                    var choiceId1 = currentChoiceId
                    waitTypeChoice(questionId1, choiceId1, choiceName1, waitTypeId, dispNo, "")
                    var questionName2 = rowValues[4]
                    if (questionName2 != "") {
                        currentQuestionId += 1
                        questionId2 = currentQuestionId
                        waitTypeQuestion(waitTypeId, questionId2, questionName2, dispNo, "")
                        var choiceName2 = rowValues[5]
                        if (choiceName2 != "") {
                            currentChoiceId += 1
                            var choiceId2 = currentChoiceId
                            waitTypeChoice(questionId2, choiceId2, choiceName2, waitTypeId, dispNo, "")
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
  Logger.log("question: KeyWAIT_TYPE," + questionId + "," + questionName + "," + waitTypeId + "," + "TRUE," + dispNo + "," + nextQuestionId)
}

function waitTypeChoice(questionId, choiceId, choiceName, waitTypeId, dispNo, nextQuestionId) {
  Logger.log("choice: KeyWAIT_TYPE," + questionId + "," + choiceId + "," + choiceName + "," + waitTypeId + "," + dispNo + "," + nextQuestionId)

}

function storeQuestion() {

}

function storeChoice() {

}
