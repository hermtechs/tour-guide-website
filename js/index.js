const client = contentful.createClient({
  space: "end5x5bjn7l8",
  environment: "master", // defaults to 'master' if not set
  accessToken: "vh2SC4Q2R127xVR1FLbKRciajhIbJ9UhDTsoDVU7Wv4",
});

const getEntries = async () => {
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
      } = item.fields;
      const { description, file } = photo.fields;
      // console.log(file);
      const photoUrl = `https://${file.url}`;
      return `
    <div class="col-lg-4 col-md-6 mb-4">
    <div class="package-item bg-white mb-2">
        <img class="img-fluid package-image" src="${photoUrl}" alt="${description}">
        <div class="p-4">
            <div class="d-flex justify-content-between mb-3 some-spacing">
                <small class="m-0" style="text-align:center"><i class="fa fa-map-marker-alt text-primary mr-2"></i>${destinationName}</small>
                <small class="m-0"><i class="fa fa-calendar-alt text-primary mr-2"></i>${noOfDays}</small>
            </div>
            <a class="h5 text-decoration-none" href="">${packageDescription}</a>
            <div class="border-top mt-4 pt-4">
                <div class="d-flex justify-content-between">
                    <h6 class="m-0"><i class="fa fa-star text-primary mr-2"></i>${rating}</h6>
                    <h5 class="m-0">${pricing}</h5>
                </div>
              ${
                pricing == undefined
                  ? ""
                  : `<small class="m-0 display-end"><i class="fa fa-user text-primary mr-2"></i>Per Person</small>`
              } 

            </div>
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
getEntries();
