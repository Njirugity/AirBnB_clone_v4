window.onload = function () {
    const $ = window.$;
    // Listen for changes on each input checkbox tag:
    const checkedAmenityIDs = [];
    const checkedAmenityNames = [];
    $('input').on('change', function () {
        if (this.checked) {
            checkedAmenityIDs.push($(this).attr('data-id'));
            checkedAmenityNames.push($(this).attr('data-name'));
        } else {
            checkedAmenityIDs.pop($(this).attr('data-id'));
            checkedAmenityNames.pop($(this).attr('data-name'));
        }
        $('div.amenities h4').text(checkedAmenityNames.join(', '));
    });
};