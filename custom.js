function filterHTML(t) {
	return (t = t.replace(new RegExp(["<"], "g"), "&lt;")).replace(
		new RegExp([">"], "g"),
		"&gt;"
	);
}

function updateHTML() {
	var t = $("#preview").html();
	$("#htmlCode").html(filterHTML(t));
}
$(document).ready(function () {
	$(".list li").click(function () {
		$(this).siblings().removeClass("selected"), $(this).addClass("selected");
	}),
		$('[data-toggle="tooltip"]').tooltip(),
		$(".section-btn-type .btn").click(function () {
			$(this).hasClass("btn-link")
				? $(".section-btn-style").hide()
				: $(".section-btn-style").show();
		}),
		$(".section-add-icon .btn").click(function () {
			0 == $(this).find("input").val()
				? $(".section-icon-option").hide()
				: $(".section-icon-option").show();
		}),
		($.fn.setButton = function () {
			var t = $("#preview"),
				n = $('input[name="btnText"]').val(),
				e = $('input[name="btnType"]:checked').val();
			0 == $('input[name="btnStyle"]:checked').val() &&
				"btn-link" != e &&
				(e = e.replace("btn", "btn-outline"));
			var i = $('input[name="btnSize"]:checked').val(),
				c = $('input[name="btnState"]:checked').val(),
				o = $('input[name="btnWidth"]:checked').val(),
				a =
					'<i class="' +
					$('input[name="iconName"]:checked').attr("data-class") +
					'"></i>';
			c = (c = $.trim(e + " " + i + " " + o + " " + c)).replace(/  +/g, " ");
			0 == $('input[name="addIcon"]:checked').val() && (a = ""),
				(n = '<button type="button" class="btn ' + c + '">' + n + "</button>"),
				t.html(n),
				"right" == $('input[name="iconPosition"]:checked').val()
					? t.find(".btn").append(" " + a)
					: t.find(".btn").prepend(a + " ");
		}),
		$("input:not(.search, .icon-set *)").on("click keyup", function () {
			$.fn.setButton();
		}),
		$.fn.setButton(),
		$('input[type="radio"]').click(function () {
			updateHTML(), Prism.highlightElement($("#htmlCode")[0]);
		}),
		$("input").keyup(function () {
			updateHTML(), Prism.highlightElement($("#htmlCode")[0]);
		}),
		new ClipboardJS("#copyHTML").on("success", function (t) {
			$("#htmlAlert")
				.fadeIn("fast")
				.delay(500)
				.queue(function () {
					$(this).fadeOut("fast"), $(this).dequeue();
				});
		});
});
