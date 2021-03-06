'use strict';

function wrapSelectionFactory(
    wrapInArrowFunctionFactory,
    wrapInAsyncFunctionFactory,
    wrapInConditionFactory,
    wrapInExecutedFunctionFactory,
    wrapInFunctionFactory,
    wrapInGeneratorFactory,
    wrapInIIFEFactory,
    wrapInTryCatchFactory,
    logger) {

    return function (_, callback) {

        var wrapBehaviors = {
            "Arrow Function": wrapInArrowFunctionFactory,
            "Async Function": wrapInAsyncFunctionFactory,
            "Condition": wrapInConditionFactory,
            "Executed Function": wrapInExecutedFunctionFactory,
            "Function": wrapInFunctionFactory,
            "Generator": wrapInGeneratorFactory,
            "IIFE": wrapInIIFEFactory,
            "Try/Catch": wrapInTryCatchFactory
        };

        function selectActionAndRun() {
            var items = Object.keys(wrapBehaviors);
            var options = {
                prompt: 'Wrap selection in:'
            };

            logger.quickPick(items, options, function (value) {
                wrapBehaviors[value](null, callback)();
            });
        }

        return selectActionAndRun;

    }

}

module.exports = wrapSelectionFactory;