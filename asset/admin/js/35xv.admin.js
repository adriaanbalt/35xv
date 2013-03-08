$(document).ready(function() {
  $('.admin-units-table').find('.unit-edit').click(function(event) {
      var m  = $('#modal');
        headerStr = 'Editing Unit: ' + $(event.currentTarget).find('td:eq(1)').text();
        m.find('#modalHeader').text(headerStr);
        m.modal({
          remote: BASE_URL + 'admin/edit_unit_form/'+$(event.currentTarget).find('td:eq(0)').text()
        });
  });

  $('.admin-units-table').find('.unit-edit-extended').click(function(event) {
    event.preventDefault();
      var m  = $('#modal');
        headerStr = 'Editing Unit: ' + $(event.currentTarget).find('td:eq(1)').text();
        m.find('#modalHeader').text(headerStr);
        m.modal({
          remote: BASE_URL + 'admin/edit_unit_form/'+$(event.currentTarget).closest('tr').find('td:eq(0)').text()+'/extended'
        });
  });

  $('.edit-team').click(function(event) {
      var m  = $('#modal');
        headerStr = 'Editing Team Member: ' + $(event.currentTarget).data('membertitle');
        m.find('#modalHeader').text(headerStr);
        m.modal({
          remote: BASE_URL + 'admin/edit_team_member_form/' + $(event.currentTarget).data('memberid')
        });
  });

  $('.gallery_image').click(function(event) {
      var m  = $('#modal');
        headerStr = 'Editing Media Item: ' + $(event.currentTarget).attr('title');
        m.find('#modalHeader').text(headerStr);
        m.modal({
          remote: BASE_URL + 'admin/edit_gallery_item_form/' + $(event.currentTarget).data('mediaid') + '/' + $(event.currentTarget).data('galleryid')
        });
  });

 $('#modal').on('hidden', function() {
    $(this).removeData('modal');
});
  $('.featured_unit_edit').change(function(event) {
    var featured_id = $(this).attr('value');
    var sitedata_id = 9;
    update_sitedata(sitedata_id, featured_id, 'Featured Unit Updated');
  });

  var update_sitedata = function(sitedata_id, content, alertText){
        $.ajax({
      url: BASE_URL + 'site/change_sitedata_ajax',
      type: 'POST',
      dataType: 'html',
      data: {
        id: sitedata_id,
        content: content
      },
      success: function(data, textStatus, xhr) {
      },
      error: function(xhr, textStatus, errorThrown) {
      },
      complete: function(xhr, textStatus) {
        fancy_alert(alertText);
      }
    });
  };

  $(".site_data_input").change(function(event) {
    var sitedata_id = $(this).attr('name');
    var content = $(this).attr('value');
    update_sitedata(sitedata_id, content, 'Updated '+ $(this).attr('title') );
  });

  $(".admin-units-table").tablesorter({
  // make the table header unselectable to enchance button feel
  cancelSelection: true,
    headers: {
      0: {
        // ID Column
        sorter: false
      },
      5: {
        // Force square footage sorter to use digits, despite commas being in the string 
        sorter: 'digit'
      },
      6: {
        // Force sorter to use numbers, despite 'sold out' etc
        sorter: 'currency',
        string: 'bottom'
      },
      8: {
        // Extended Edit Column 
        sorter: false
      }
    },
    cssAsc: 'availability-asc',
    cssDesc: 'availability-desc',
    cssHeader: 'availability-header',
    sortList: [[5,1],[6,1]]
    });

  $('.admin-units-table').find('.tablesorter-header-inner').append('<span class="arrow"></span>');

  $('.availability-asc').find('.arrow').removeClass('down').addClass('up');
  $('.availability-desc').find('.arrow').removeClass('up').addClass('down');

  $(".admin-units-table").bind("sortStart",function() {
    $('.availability-header').find('.arrow').removeClass('down').removeClass('up');
    }).bind("sortEnd",function() {
    $('.availability-asc').find('.arrow').removeClass('down').addClass('up');
    $('.availability-desc').find('.arrow').removeClass('up').addClass('down');
    });


var fancy_alert = function(string){
  $('<div />').prependTo('body').addClass('alert alert-success fancy-alert').text(string).slideDown(400).delay(1200).slideUp(300,function(event){ $(this).remove(); });
};

});
