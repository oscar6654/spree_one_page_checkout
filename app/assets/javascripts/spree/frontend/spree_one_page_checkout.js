SpreeOnePageCheckout = {
    replaceCheckoutStep: function(step, partial, error) {
        SpreeOnePageCheckout.disableSteps(true);
        if (partial != null) {
            step.html(partial);
        }
        if (!!error) {
            step.find('form.edit_order').prepend("<p class='checkout-error'>" + error + "</p>");
        }
        return SpreeOnePageCheckout.enableStep(step);
    },
    enableStep: function(element) {
        element.removeClass("disabled-step");
        element.find("form input").removeAttr("disabled");
        element.find("#checkout-summary, .errorExplanation").show();
        if (element.data('step') === 'address') {
            Spree.onAddress();
        }
        if (element.data('step') === 'payment') {
            return Spree.onPayment();
        }
    },
    disableSteps: function(all) {
        var elements;
        elements = all != null ? $(".checkout_content") : $(".checkout_content.disabled-step");
        elements.addClass("disabled-step");
        elements.find("form input").attr("disabled", "disabled");
        return elements.find("#checkout-summary, .errorExplanation").hide();
    },
    bindShowAjaxProgressBar: function() {
        $(document).on("ajax:beforeSend", "#checkout", function() {
            $("#progress-one-page-checkout").slideDown();
        });

        $(document).on("ajax:complete", "#checkout", function() {
            $("#progress-one-page-checkout").slideUp();
        });
    },
    documentOnReady: function() {
        this.bindShowAjaxProgressBar();
    }
};

Spree.ready(function($) {
    if (($('#checkout')).is('*')) {
        return SpreeOnePageCheckout.disableSteps();
    }
});

(function($) {
    $(document).ready(function() {
        SpreeOnePageCheckout.documentOnReady();
    });
})(jQuery);