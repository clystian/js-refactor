'use strict';

var mocker = require('./mocker');

var testHelperFactory = require('./test-utils/testHelperFactory');

var readSource = require('./test-utils/read-source');
var prettyJson = require('./test-utils/test-utils').prettyJson;

var approvalsConfig = require('./test-utils/approvalsConfig');
require('approvals').configure(approvalsConfig).mocha('./test/approvals');

var sinon = require('sinon');

describe('Shift Params Left', function () {
    var subcontainer;
    var applySetEditSpy;
    var vsCodeProperties;

    beforeEach(function () {
        var testHelper = testHelperFactory();

        subcontainer = testHelper.subcontainer;
        applySetEditSpy = testHelper.applySetEditSpy;
        vsCodeProperties = testHelper.vsCodeProperties;

        applySetEditSpy = sinon.spy(function (text, coords) {
            return {
                then: function (callback) {

                }
            };
        });

        mocker.getMock('editActionsFactory').api.applySetEdit = applySetEditSpy;
    });

    it('should log an error if selection is empty', function () {
        var sourceTokens = readSource('./test/fixtures/shiftParams/shiftParams.js');

        vsCodeProperties.activeTextEditor = {
            _documentData: {
                _lines: sourceTokens
            }
        };

        var info = mocker.getMock('logger').api.info;
        subcontainer.build('shiftParamsLeftFactory')(null, function () { })();

        this.verify(prettyJson(info.args));
    });

    it('should rotate params one to the left', function () {
        var sourceTokens = readSource('./test/fixtures/shiftParams/shiftParams.js');

        vsCodeProperties.activeTextEditor = {
            _documentData: {
                _lines: sourceTokens
            },
            _selections: [{
                _start: {
                    _line: 2,
                    _character: 14
                },
                _end: {
                    _line: 2,
                    _character: 21
                }
            }]
        };

        subcontainer.build('shiftParamsLeftFactory')(null, function () { })();

        this.verify(prettyJson(applySetEditSpy.args));
    });


});