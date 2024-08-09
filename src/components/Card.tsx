import {
  Card,
  CardBody,
  Button,
  Text,
  Image,
  useDisclosure,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialog,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  PokemonAbilityRequestProps,
  pokemonAbilityRequest,
} from "../axiosConfig";

export default function OutlinedCard({
  key,
  name,
  url,
  id,
}: Readonly<{
  key: string;
  name: string;
  url: string;
  id: string;
}>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<null>(null);

  const [abilityResults, setAbilityResults] =
    useState<PokemonAbilityRequestProps>();

  useEffect(() => {
    const request = async () => {
      const abilityPokemons = await pokemonAbilityRequest(id);

      setAbilityResults(abilityPokemons);
    };
    if (isOpen) {
      request();
    }
  }, [isOpen, id]);

  return (
    <Flex alignItems="center" justifyContent="center">
      <Card
        w={"sm"}
        key={key}
        backgroundColor={"#D3D3D3"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        margin="10px"
        width="30%"
      >
        <CardBody>
          <Flex direction="column" alignItems="center" justifyContent="center">
            <Text fontSize="25">
              <strong>{name}</strong>
            </Text>
            <div className="image-container">
              <Image
                src={url}
                alt="Green double couch with wooden legs"
                borderRadius="lg"
                onClick={onOpen}
                _hover={{
                  background: "gray",
                }}
              />
            </div>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent backgroundColor="black">
                  <AlertDialogHeader
                    fontSize="22px"
                    fontWeight="bold"
                    color="gray.300"
                  >
                    {name} effect
                  </AlertDialogHeader>

                  <AlertDialogBody color="gray.300">
                    {abilityResults?.effect_entries[1].short_effect}
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button
                      ref={cancelRef}
                      onClick={onClose}
                      fontSize="15px"
                      width="60px"
                      height="30px"
                    >
                      Close
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}
