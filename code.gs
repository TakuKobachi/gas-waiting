var STORE_QUESTION_COLUMN_COUNT = 40
var WAIT_TYPE_COLUMN_COUNT = 2
var WAIT_TYPE_QUESTION_COLUMN_COUNT = 40
var DISP_FLG = "TRUE"
var MAX_ROW_COUNT = 2

function main() {
    waitTypeQuestion()
    storeQuestion()
}

function waitTypeQuestion() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var GROUP_CD = "KeyWAIT_TYPE"
    var dispNo = 0
    var currentWaitTypeId = ""
    var currentWaitTypeQuestionID = ""
    var currentWaitTypeQuestionWord = ""
    var currentWaitTypeChoiceId = ""
    var nextQuestionId = ""
    for (var i = 1; i < MAX_ROW_COUNT; i++) {
        var range = sheet.getRange(i, 1, 1, STORE_QUESTION_COLUMN_COUNT + WAIT_TYPE_COLUMN_COUNT + WAIT_TYPE_QUESTION_COLUMN_COUNT)
        Logger.log(range.getValues());
    }
}

function waitTypeChoice() {

}

function storeQuestion() {

}

function storeChoice() {

}
