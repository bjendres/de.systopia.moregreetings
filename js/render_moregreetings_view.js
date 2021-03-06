/*-------------------------------------------------------+
| SYSTOPIA - MORE GREETINGS EXTENSION                    |
| Copyright (C) 2017 SYSTOPIA                            |
| Author: B. Endres (endres@systopia.de)                 |
|         P. Batroff (batroff@systopia.de)               |
| http://www.systopia.de/                                |
+--------------------------------------------------------+
| This program is released as free software under the    |
| Affero GPL license. You can redistribute it and/or     |
| modify it under the terms of this license which you    |
| can read by viewing the included agpl.txt or online    |
| at www.gnu.org/licenses/agpl.html. Removal of this     |
| copyright header is strictly prohibited without        |
| written permission from the original author(s).        |
+--------------------------------------------------------*/

var more_greetings_block = "div.crm-custom-set-block-MOREGREETINGS";
var more_greetings_group = "#custom-set-content-MOREGREETINGS";
var more_greetings_dependencies = ["#crm-contactname-content", "#communication-pref-block", "#crm-demographic-content"];

function moregreetings_beautify() {
  var rows = cj(more_greetings_block).find("div.crm-summary-row");
  for (var i = 0; i <= rows.length; i+=2) {
    var flag = cj(rows[i+1]).find("div.crm-content").html();
    if (flag == 'LOCALISED_YES') {
      // mark protected rows:
      var greeting_label = cj(rows[i]).find("div.crm-label");
      greeting_label.html("<i>" + greeting_label.html() + "</i>");
      // var greeting = cj(rows[i]).find("div.crm-content");
      // greeting.html("<i>" + greeting.html() + "</i>");
    }

    // remove the rows showing the protection flag
    cj(rows[i+1]).hide();
  }

  // add data-dependent-fields dependencies
  for (var i = 0; i < more_greetings_dependencies.length; i++) {
    var current_value = cj(more_greetings_dependencies[i]).attr('data-dependent-fields');
    var fields = eval(current_value);
    if (fields) {
      if (fields.indexOf(more_greetings_group) == -1) {
        fields.push(more_greetings_group);
        cj(more_greetings_dependencies[i]).attr('data-dependent-fields', JSON.stringify(fields));
      }
    }
  }
}

cj(document).ready(function () {
  // move more greetings block to right hand side (see #4)
  var leftTab = cj("div.crm-summary-comm-pref-block").parent();
  var section = leftTab.parent();
  var rightTab = cj(section).find("div.contactCardRight");
  if (!rightTab.length) { // not found, probably Organisation screen
    leftTab.after('<div class="contactCardRight"></div>');
    rightTab = cj(section).find("div.contactCardRight");
  }
  cj(rightTab).append(cj(more_greetings_block));

  // beautify
  moregreetings_beautify();

  // inject data dependency
  cj(document).bind("ajaxComplete", moregreetings_beautify);
});

