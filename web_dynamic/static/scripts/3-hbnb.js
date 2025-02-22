/* global $ */
$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }
    const amenityList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(`Amenities: ${amenityList}`);
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }).fail(function () {
    $('#api_status').removeClass('available');
  });

  function fetchPlaces () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (data) {
        $('section.places').empty();
        data.forEach(place => {
          const placeHTML = `
                        <article>
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest(s)</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>
                            </div>
                            <div class="description">${place.description}</div>
                        </article>
                    `;
          $('section.places').append(placeHTML);
        });
      },
      error: function () {
        console.error('Failed to fetch places.');
      }
    });
  }
  fetchPlaces();
});
