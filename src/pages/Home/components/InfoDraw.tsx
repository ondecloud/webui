//
// const InfoDraw: React.FC = (info: API.DownloadInfo) => {
//   const { show, setShow } = useState(false);
//
//   return (
//     <ProTable>
//       <Drawer
//         width={600}
//         open={!!row}
//         onClose={() => {
//           setRow(undefined);
//         }}
//         closable={false}
//       >
//         {row?.name && (
//           <ProDescriptions<TableListItem>
//             column={2}
//             title={row?.name}
//             request={async () => ({
//               data: row || {},
//             })}
//             params={{
//               id: row?.name,
//             }}
//             columns={columns}
//           />
//         )}
//       </Drawer>
//     </ProTable>
//   );
// };
