import axios from "axios";
import { Container, Row } from "react-bootstrap";
import { API_ENDPOINT, SUPABASE_KEY } from "../../../constant";

const fetchCar = async (id) => {
  const { data } = await axios.get(`${API_ENDPOINT}/cars?id=eq.${id}`, {
    headers: {
      apikey: SUPABASE_KEY,
    },
  });

  return data[0];
};

export async function getServerSideProps(context) {
  const data = await fetchCar(context.params.id);
  console.log("data", data);
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  };
}

const Car = ({ data }) => {
  return (
    <div>
      <Container>
        {data && (
          <>
            <Row>
              <img
                src={`/cars/${data.id}.jpg`}
                style={{
                  width: "100%",
                }}
              />
            </Row>
            <Row>
              <h1 className="text-center">
                {(data && data.name) || "SuperCar"}
              </h1>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Car;
