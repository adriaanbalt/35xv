$(document).ready(function() {
  $('.admin-units-table').find('.unit-edit').click(function(event) {
      var m  = $('#modal');
        headerStr = 'Editing Unit: ' + $(event.currentTarget).find('td:eq(1)').text();
        m.find('#modalHeader').text(headerStr);
        m.modal({
          remote: BASE_URL + 'admin/edit_unit_form/'+$(event.currentTarget).find('td:eq(0)').text()
        });
  });

  $('.edit-team').click(function(event) {
      var m  = $('#modal');
        headerStr = 'Editing Team Member: ' + $(event.currentTarget).data('membertitle');
        m.find('#modalHeader').text(headerStr);
        m.modal({
          remote: BASE_URL + 'admin/edit_team_member_form/'+$(event.currentTarget).data('memberid')
        });
  });

  $(".admin-units-table").tablesorter({
  // make the table header unselectable to enchance button feel
  cancelSelection: true,
    headers: {
      5: {
        // Force square footage sorter to use digits, despite commas being in the string 
        sorter: 'digit'
      },
      6: {
        // Force sorter to use numbers, despite 'sold out' etc 
        sorter: 'currency'
      }
    },
    cssAsc: 'availability-asc',
    cssDesc: 'availability-desc',
    cssHeader: 'availability-header',
    sortList: [[0,0]]
    });

  $('.availability-header').append('<span class="arrow"></span>');

  $(".admin-units-table").bind("sortStart",function() {
    $('.availability-header').find('.arrow').removeClass('down').removeClass('up');
    }).bind("sortEnd",function() {
    $('.availability-asc').find('.arrow').removeClass('up').addClass('down');
    $('.availability-desc').find('.arrow').removeClass('down').addClass('up');
    });
});

