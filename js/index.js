const client = contentful.createClient({
  space: "end5x5bjn7l8",
  environment: "master", // defaults to 'master' if not set
  accessToken: "vh2SC4Q2R127xVR1FLbKRciajhIbJ9UhDTsoDVU7Wv4",
});

const closeOverlayBtn = document.querySelector(".close-overlay");
const contactUsOvelay = document.querySelector(".overlay");
const bookNowBtns = document.querySelectorAll(".book-btn");
// console.log(bookNowBtns);

bookNowBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    contactUsOvelay.style.transform = "translateY(0%)";
  })
);

closeOverlayBtn.addEventListener("click", () => {
  contactUsOvelay.style.transform = "translateY(100%)";
});

const getTourPackages = async () => {
  const tourPackages = await client.getEntries({
    content_type: "tourPackages",
  });
  const itemsObject = tourPackages.items;
  const tourPackageHTML = itemsObject
    .map((item) => {
      const {
        destinationName,
        packageDescription,
        noOfDays,
        rating,
        pricing,
        photo,
        packageInfo,
      } = item.fields;
      const { description, file } = photo.fields;
      // console.log(file);
      const photoUrl = `https://${file.url}`;
      return `
    <div class="col-lg-4 col-md-6 mb-4 tour-package">
    <div class="package-item bg-white mb-2">
        <img class="img-fluid package-image" src="${photoUrl}" alt="${description}">
        <div class="p-4">
            <div class="d-flex justify-content-between mb-3 some-spacing">
                <small class="m-0" style="text-align:center"><i class="fa fa-map-marker-alt text-primary mr-2"></i>${destinationName}</small>
                <small class="m-0"><i class="fa fa-calendar-alt text-primary mr-2"></i>${noOfDays}</small>
            </div>
            <p class="h5 text-decoration-none">${packageDescription}</p>
            <div class="border-top mt-4 pt-4">
                <div class="d-flex justify-content-between">
                    <h6 class="m-0"><i class="fa fa-star text-primary mr-2"></i>${rating}</h6>
                    <h5 class="m-0">${pricing == undefined ? " " : pricing}</h5>
                </div>
              ${
                pricing == undefined
                  ? " "
                  : `<small class="m-0 display-end"><i class="fa fa-user text-primary mr-2"></i>Per Person</small>`
              } 

            </div>
        </div>
    </div>
    <div class='package-description l-quote quote'>
    <div class="description-text">
      <p>${packageInfo}</p>
    </div>
  </div>   
</div>
    `;
    })
    .join("");
  //   console.log(tourPackageHTML);
  const packagesContainer = document.querySelector(".packages-container");
  packagesContainer.innerHTML = tourPackageHTML;
};
getTourPackages();

const getTopDestinations = async () => {
  const topDestinations = await client.getEntries({
    content_type: "topDestinations",
  });
  //   console.log(topDestinations.items);
  const topDestinationsItems = topDestinations.items;
  const topDestinationsHTML = topDestinationsItems
    .map((item) => {
      const { destinationName, noOfAttractions, destinationPhoto } =
        item.fields;
      const { description, file } = destinationPhoto.fields;
      const photoUrl = `https://${file.url}`;
      return `
    <div class="col-lg-4 col-md-6 mb-4 top-destination">
    <div class="destination-item position-relative overflow-hidden mb-2">
        <img class="img-fluid top-destination-photo" src="${photoUrl}" alt="${description}">
        <a class="destination-overlay text-white text-decoration-none">
            <h5 class="text-white">${destinationName}</h5>
            <span>${noOfAttractions}</span>
        </a>
    </div>
  </div>
  
    `;
    })
    .join("");

  const topDestinationsContainer = document.querySelector(
    ".top-destinations-container"
  );
  topDestinationsContainer.innerHTML = topDestinationsHTML;
};

getTopDestinations();

const getTestimonials = async () => {
  const testimonialObject = await client.getEntries({
    content_type: "testimonials",
  });
  const testimonialItems = testimonialObject.items;
  const testimonialHTML = testimonialItems
    .map((item) => {
      const { clientPhoto, clientName, clientProfession, testimonialMessage } =
        item.fields;
      console.log(item.fields);
      console.log(clientPhoto);
      console.log(clientName);
      if (file !== undefined) {
        var { file } = clientPhoto.fields;
        var photoUrl = `https://${file.url}`;
      } else {
        photoUrl = undefined;
      }

      return `        
        <div class="owl-item">
        <div class="card d-flex flex-column">
          <div class="mt-2">
            <span class="fas fa-star active-star"></span>
            <span class="fas fa-star active-star"></span>
            <span class="fas fa-star active-star"></span>
            <span class="fas fa-star active-star"></span>
            <span class="fas fa-star-half-alt active-star"></span>
          </div>
          <div class="main font-weight-bold pb-2 pt-1">Great Service</div>
          <div class="testimonial">${testimonialMessage} </div>
          <div class="d-flex flex-row profile pt-4 mt-auto">
            <img src="${photoUrl == undefined ? "../img/user.png" : photoUrl}"
            alt="" class="rounded-circle">

            <div class="d-flex flex-column pl-2">
              <div class="name">${clientName}</div>
              <p class="text-muted designation">${clientProfession}</p>
            </div>
          </div>
        </div>
      </div>
        `;
    })
    .join("");
  const testimonialContainer = document.querySelector(
    ".testimonials-container"
  );
  // testimonialContainer.innerHTML = testimonialHTML;
};

$(document).ready(function () {
  var silder = $(".owl-carousel");
  silder.owlCarousel({
    autoPlay: false,
    items: 1,
    center: false,
    nav: true,
    margin: 40,
    dots: true,
    loop: true,
    navText: ["", ""],
    responsive: {
      0: {
        items: 1,
      },
      575: { items: 1 },
      768: { items: 2 },
      991: { items: 3 },
      1200: { items: 4 },
    },
  });
});
// document.addEventListener("DOMContentLoaded", () => {
//   getTestimonials();
// });
