import axios from "axios";
import { Container, Row } from "react-bootstrap";
import { API_ENDPOINT, SUPABASE_KEY } from "../../../constant";

export async function getStaticPaths() {
  const { data } = await axios.get(`${API_ENDPOINT}/cars`, {
    headers: {
      apikey: SUPABASE_KEY,
    },
  });

  return {
    paths: data.map((car) => ({
      params: {
        id: car.id.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { data } = await axios.get(`${API_ENDPOINT}/cars`, {
    headers: {
      apikey: SUPABASE_KEY,
    },
  });
  return {
    props: {
      data: data.filter(({ id }) => id === parseInt(context.params.id))[0],
    },
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
