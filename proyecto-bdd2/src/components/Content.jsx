const Content = ({ title, text }) => {
    return (
      <section className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p>{text}</p>
      </section>
    );
  };
  
  export default Content;
  