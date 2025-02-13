import "./AssetDetail.styles.css";

export default function AssetDetail() {
  return (
    <>
      <div className="asset-detail">
        <div className="image-container">
          <img src="https://picsum.photos/500/750" alt="" />
        </div>
        <div className="info-container">
          <h1 className="info-title">Der Name des Windes</h1>
          <div className="tag-contaner">Buch</div>
          <div className="pricing">
            <h5 className="info-currency">€</h5>
            <h3 className="info-pricing">24,99</h3>
          </div>
          <div className="rating">
            <p>Stars</p>
            <p>(4,5)</p>
          </div>
          <p>Serial: HP123</p>

          <p className="info-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae,
            delectus magni tempore eos eius corporis corrupti exercitationem
            explicabo voluptates, unde, voluptatibus nemo beatae. Totam facere
            voluptate ab! In, dolorem iure illo culpa optio beatae voluptatum,
            rem fuga consectetur itaque cumque, tenetur officia quaerat.
            Voluptate labore, beatae asperiores quos fugit voluptatem!
          </p>
        </div>
      </div>
    </>
  );
}
