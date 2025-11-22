const Advertisement = () => {
  return (
    <div className="advertisement">
      <div className="advertisement__banner">
        <div className="advertisement__content">
          <h4 className="advertisement__title">eScore Mobile App</h4>
          <p className="advertisement__text">
            Barcha sport yangiliklar va jonli natijalarni mobil ilovamizda kuzating!
          </p>
          <div className="advertisement__buttons">
            <a href="#" className="advertisement__button">
              <i className="ri-apple-line"></i>
              App Store
            </a>
            <a href="#" className="advertisement__button">
              <i className="ri-google-play-line"></i>
              Google Play
            </a>
          </div>
        </div>
        <div className="advertisement__image">
          <img 
            src="https://readdy.ai/api/search-image?query=modern%20smartphone%20displaying%20sports%20app%20interface%20with%20clean%20design%20and%20football%20scores%20on%20screen%2C%20minimalist%20background&width=200&height=300&seq=app1&orientation=portrait" 
            alt="eScore Mobile App" 
          />
        </div>
      </div>
    </div>
  );
};

export default Advertisement;