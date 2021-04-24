import FruitStore from './FruitStore.jpg'

const HomePage = () => {
  return (
    <div className="homePage" style={{ backgroundImage: `url(${FruitStore})`,
    backgroundSize: '100vw, 100%',
    backgroundRepeat: 'no-repeat',
    }}>
      <h1>Welcome to your Fitness Journey.</h1>

      <p>
        Create and Track your Fitness Routines.
      </p>
    </div>
  );
};

export default HomePage;